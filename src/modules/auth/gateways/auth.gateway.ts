import { RolesService } from "@modules/roles/services/roles.service";
import { Inject } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";
import { AuthService } from "../services/auth.service";
import { isEmpty } from "class-validator";
import { compareIds } from "@shared/functions";

@WebSocketGateway({
	cors: {
		origin: '*',
	},
	path: '/auth',
})
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    @Inject(RolesService) private rolesService: RolesService,
    @Inject(AuthService) private authService: AuthService,
  ) {}

  private async authenticate(client: any) {
    const userData = await this.authService.wsSignin(client);
    if(isEmpty(userData)) return;
    client.userData = userData;

    client.subscriptions ??= [];

    const roleSub = this.rolesService.$role.subscribe((role) => {
      if(isEmpty(role)) return;
      const roleId = typeof userData.role === 'string' ? userData.role : userData.role?._id;
      if(!compareIds(role?._id, roleId)) return;
      client.userData.role = role;
      client.emit('role', role);
    });
    client.subscriptions.push(roleSub);
  }

  handleConnection(client: any) {
    this.authenticate(client);
    return;
  }
  handleDisconnect(client: any) {
    client.subscriptions?.map((sub: any) => sub.unsubscribe());
    return;
  }
}