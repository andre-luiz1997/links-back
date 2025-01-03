import { PartialType } from "@nestjs/swagger";
import { CreateHealthIndicatorDTO } from "./create-health-indicator.dto";

export class UpdateHealthIndicatorDTO extends PartialType(CreateHealthIndicatorDTO) {}