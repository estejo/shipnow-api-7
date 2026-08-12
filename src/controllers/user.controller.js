export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({ status: 'success', data: users });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.status(200).json({ status: 'success', data: user });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const newUser = await this.userService.createUser(req.body);
      res.status(201).json({ status: 'success', data: newUser });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  };
}