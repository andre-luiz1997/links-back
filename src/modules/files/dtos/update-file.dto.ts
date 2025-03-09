import { PartialType } from "@nestjs/swagger";
import { CreateFileDTO } from "./create-file.dto";

export class UpdateFileDTO extends PartialType(CreateFileDTO) {}