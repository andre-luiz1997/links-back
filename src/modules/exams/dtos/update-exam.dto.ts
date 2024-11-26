import { PartialType } from "@nestjs/swagger";
import { CreateExamDTO } from "./create-exam.dto";

export class UpdateExamDTO extends PartialType(CreateExamDTO) {}