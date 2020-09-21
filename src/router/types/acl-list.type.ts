import { UserCommand } from '../../core/types/user-command.type';
import { UserDocument } from '../../database/models';

export interface AclList {
  [command: string ]: {
    allowed: Array<string>;
    exec: (com: UserCommand, user: UserDocument | null) => Promise<void>;
  };
}
