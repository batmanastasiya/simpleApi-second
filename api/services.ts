import { AuthService } from './services/authService';
import { UsersService } from './services/usersService';
import { NotesService } from './services/notesService';
import { ApiClient } from './apiClient';

export class Services {
  private static instanceList: Record<string, Services> = {};
  private client!: ApiClient;
  private notesService!: NotesService;
  private authService!: AuthService;
  private usersService!: UsersService;

  private constructor() {
    this.client = new ApiClient();
  }

  public getNotesService(): NotesService {
    if (!this.notesService) {
      this.notesService = new NotesService(this.client);
    }

    return this.notesService;
  }

  public getAuthService(): AuthService {
    if (!this.authService) {
      this.authService = new AuthService(this.client);
    }

    return this.authService;
  }

  public getUsersService(): UsersService {
    if (!this.usersService) {
      this.usersService = new UsersService(this.client);
    }

    return this.usersService;
  }

  public static getInstance(name = 'default'): Services {
    if (!Services.instanceList[name]) {
      Services.instanceList[name] = new Services();
    }

    return Services.instanceList[name];
  }
}

// export class ServicesFactory {
//   private static client: ApiClient;
//   private static notesService: NotesService;
//   private static authService: AuthService;
//   private static usersService: UsersService;
//
//   // private constructor() {}
//
//   public static getNotesService(): NotesService {
//     if (!ServicesFactory.notesService) {
//       ServicesFactory.notesService = new NotesService(
//         ServicesFactory.getApiClient(),
//       );
//     }
//
//     return ServicesFactory.notesService;
//   }
//
//   public static getAuthService(): AuthService {
//     if (!ServicesFactory.authService) {
//       ServicesFactory.authService = new AuthService(
//         ServicesFactory.getApiClient(),
//       );
//     }
//
//     return ServicesFactory.authService;
//   }
//
//   public static getUsersService(): UsersService {
//     if (!ServicesFactory.usersService) {
//       ServicesFactory.usersService = new UsersService(
//         ServicesFactory.getApiClient(),
//       );
//     }
//
//     return ServicesFactory.usersService;
//   }
//
//   private static getApiClient(): ApiClient {
//     if (!ServicesFactory.client) {
//       ServicesFactory.client = new ApiClient();
//     }
//
//     return ServicesFactory.client;
//   }
// }
