export class CreateCollaboratorDto {
  readonly email: string;
  readonly role: 'admin' | 'viewer';
}
