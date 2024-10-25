import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Model } from 'mongoose';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(client: ClientDocument) {
    const payload = {
      id: client._id,
      is_active: client.is_active,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
  async create(createClientDto: CreateClientDto, res: Response) {
    const newClient = await this.clientModel.create(createClientDto);
    return newClient;
  }

  async findClientByEmail(email: string): Promise<Client> {
    return this.clientModel.findOne({
      where: { email },
      include: {
        all: true,
        attributes: ['value'],
        through: { attributes: [] },
      },
    });
  }

  async findAll() {
    return this.clientModel.find();
  }

  async findOne(id: string) {
    return this.clientModel.findById(id);
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(id, updateClientDto);
  }

  async remove(id: string) {
    return this.clientModel.findByIdAndDelete(id);
  }
}
