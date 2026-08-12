import { USER_ROLES } from '../constants/index.js';

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
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  async createUser(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('El correo electrónico ya se encuentra registrado');
    }

    // Regla de negocio: si no se especifica rol, asignar USER por defecto
    const role = Object.values(USER_ROLES).includes(userData.role)
      ? userData.role
      : USER_ROLES.USER;

    return await this.userRepository.create({ ...userData, role });
  }
}