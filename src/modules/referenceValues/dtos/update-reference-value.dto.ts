import { PartialType } from "@nestjs/swagger";
import { CreateReferenceValuesDTO } from "./create-reference-value.dto";

export class UpdateReferenceValuesDTO extends PartialType(CreateReferenceValuesDTO) {}