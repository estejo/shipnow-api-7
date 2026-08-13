import { USER_ROLES } from '../constants/index.js';
import { UserNotFoundError, UserAlreadyExistsError } from '../errors/custom.errors.js';

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.findAllActive();
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }

  async createUser(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const role = Object.values(USER_ROLES).includes(userData.role)
      ? userData.role
      : USER_ROLES.USER;

    return await this.userRepository.create({ ...userData, role });
  }
}