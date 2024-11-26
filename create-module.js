const fs = require('fs');
const path = require('path');

function kebabToCamelCase(str) {
	// Remove caracteres inválidos, converte '-' para '_', e transforma em camelCase
	const snakeCase = str
		.replace(/[^a-zA-Z-]/g, '') // Remove caracteres não permitidos
		.replace(/-/g, '_'); // Converte '-' para '_'

	return snakeCase.replace(/_([a-zA-Z])/g, (_, letter) => letter.toUpperCase());
}

function createModule(moduleName, noEntity) {
	// Converte kebab para snake case
	moduleName = kebabToCamelCase(moduleName);
	const modulePath = path.join(__dirname, `src/modules/${moduleName}`);

	const dirs = ['controllers', 'services'];
	if (!noEntity) {
		dirs.push('dtos', 'entities', 'types');
	}

	// Cria os diretórios
	// biome-ignore lint/complexity/noForEach: <explanation>
	dirs.forEach(dir => {
		const dirPath = path.join(modulePath, dir);
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}
	});
	const propName = moduleName;
	const className = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
	// Cria arquivos básicos
	fs.writeFileSync(
		path.join(modulePath, `${propName}.module.ts`),
		`import { Module } from '@nestjs/common';\nimport { ${className}Controller } from './controllers/${propName}.controller';\nimport { ${className}Service } from './services/${propName}.service';\n@Module({\n\timports: [],\n\tcontrollers: [${className}Controller],\n\tproviders: [${className}Service],\n})\nexport class ${className}Module {}`,
	);
	fs.writeFileSync(
		path.join(modulePath, `controllers/${propName}.controller.ts`),
		`import { Controller } from '@nestjs/common';\n\n@Controller('${propName}')\nexport class ${className}Controller {}`,
	);
	fs.writeFileSync(
		path.join(modulePath, `services/${propName}.service.ts`),
		`import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class ${className}Service {}`,
	);

	if(!noEntity) {

		fs.writeFileSync(path.join(modulePath, `dtos/${propName}.dto.ts`), `export class ${className}Dto {}`);
		fs.writeFileSync(
			path.join(modulePath, `entities/${propName}.entity.ts`),
			`import type { I${className} } from "@modules/${propName}/types/${propName}";\nimport {Types,Schema} from "mongoose"\nexport class ${className}Entity implements I${className} {}\nexport const ${className}Schema = new Schema<${className}Entity>({\n_id: Types.ObjectId,\n},{\n timestamps: true,\n})\n`,
		);
		fs.writeFileSync(
			path.join(modulePath, `types/${propName}.ts`),
			`import type { DBEntity } from "@modules/shared/types";\nexport interface I${className} extends DBEntity {}`,
		);
		// Atualiza o arquivo @shared/providers.ts
		const providersPath = path.join(__dirname, 'src/modules/shared/providers.ts');
		const constantsEnumPath = path.join(__dirname, 'src/constants.ts');
	
		if (fs.existsSync(constantsEnumPath)) {
			let enumContent = fs.readFileSync(constantsEnumPath, 'utf-8');
	
			// Adiciona o novo enum se não estiver presente
			const newEnum = `    ${className.toUpperCase()} = '${className.toUpperCase()}',`;
			if (!enumContent.includes(newEnum)) {
				const enumInsertIndex = enumContent.indexOf('}') - 1; // Adiciona antes do fechamento da enumeração
				enumContent = `${enumContent.slice(0, enumInsertIndex)}\n${newEnum}\n${enumContent.slice(enumInsertIndex)}`;
			}
	
			// Salva as alterações no arquivo
			fs.writeFileSync(constantsEnumPath, enumContent, 'utf-8');
		} else {
			console.warn(`Arquivo ${constantsEnumPath} não encontrado. Crie o enum manualmente.`);
		}
	
		// Verifica se o arquivo existe
		if (fs.existsSync(providersPath)) {
			let content = fs.readFileSync(providersPath, 'utf-8');
	
			// Adiciona a importação do novo schema e do ProvidersEnum
			const schemaImport = `import { ${className}Schema } from '@modules/${propName}/entities/${propName}.entity';`;
			const providersEnumImport = `import { ProvidersEnum } from '${constantsEnumPath}';`;
			const providerDeclaration = `export const ${className}Provider: IProvider = {\n\tname: ProvidersEnum.${className.toUpperCase()},\n\tschema: ${className}Schema\n};`;
	
			if (!content.includes(schemaImport)) {
				content = `${schemaImport}\n${content}`;
			}
	
			if (!content.includes(providersEnumImport)) {
				content = `${providersEnumImport}\n${content}`;
			}
	
			// Adiciona o novo provider antes do array de Providers
			const providersArrayRegex = /export const Providers\s*=\s*\[(.*?)\];/s;
			if (providersArrayRegex.test(content)) {
				const match = content.match(providersArrayRegex);
				const arrayStartIndex = match.index;
	
				// Insere o novo provider antes do array de Providers
				if (!content.includes(providerDeclaration)) {
					content = `${content.slice(0, arrayStartIndex)}\n${providerDeclaration}\n\n${content.slice(arrayStartIndex)}`;
				}
	
				// Atualiza o array de Providers
				const existingProviders = match[1];
				if (!existingProviders.includes(`${className}Provider`)) {
					const updatedProvidersArray = existingProviders.trim()
						? `${existingProviders.trim()}, ${className}Provider`
						: `${className}Provider`;
					content = content.replace(providersArrayRegex, `export const Providers = [${updatedProvidersArray}];`);
				}
			} else {
				// Caso o array Providers não exista
				if (!content.includes(providerDeclaration)) {
					content += `\n${providerDeclaration}\n`;
				}
				content += `\nexport const Providers = [${className}Provider];\n`;
			}
	
			// Salva as alterações no arquivo
			fs.writeFileSync(providersPath, content, 'utf-8');
		} else {
			console.warn('Arquivo @shared/providers.ts não encontrado. Crie a importação e o enum manualmente.');
		}
	}
}

const args = process.argv.slice(2);
const moduleName = args.find(arg => !arg.startsWith('--'));
const noEntity = args.includes('--no-entities');
if (!moduleName) {
	console.log('Por favor, forneça o nome do módulo.');
	process.exit(1);
}

createModule(moduleName, noEntity);
console.log(`Módulo ${moduleName} criado com sucesso!`);
