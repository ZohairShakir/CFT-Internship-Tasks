import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Role } from './enums/role.enum';

interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
}

@Injectable()
export class AuthService {
  /** In-memory user store */
  private readonly users: StoredUser[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async signup(dto: SignupDto): Promise<{ accessToken: string }> {
    const existingUser = this.users.find((u) => u.email === dto.email);
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const newUser: StoredUser = {
      id: uuidv4(),
      email: dto.email,
      passwordHash,
      role: dto.role ?? Role.User,
    };

    this.users.push(newUser);

    return { accessToken: this.generateToken(newUser) };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = this.users.find((u) => u.email === dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { accessToken: this.generateToken(user) };
  }

  private generateToken(user: StoredUser): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
