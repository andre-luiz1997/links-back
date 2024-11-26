import { PartialType } from "@nestjs/swagger";
import { CreateExamTypeDTO } from "./create-exam-type.dto";

export class UpdateExamTypeDTO extends PartialType(CreateExamTypeDTO) {}