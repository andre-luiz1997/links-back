import { PartialType } from "@nestjs/swagger";
import { CreatePlanDTO } from "./create-plan.dto";

export class UpdatePlanDto extends PartialType(CreatePlanDTO) {}