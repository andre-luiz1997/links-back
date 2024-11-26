import { PartialType } from "@nestjs/swagger";
import { CreateLabDTO } from "./create-lab.dto";

export class UpdateLabDTO extends PartialType(CreateLabDTO) {}  