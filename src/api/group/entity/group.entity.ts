import { Group } from '@prisma/client';

export class GroupEntity {
  idx: number;
  uuid: string;
  email: string;
  name: string;
  createdAt: Date;

  constructor(data: {
    idx: number;
    uuid: string;
    email: string;
    name: string;
    createdAt: Date;
  }) {
    this.idx = data.idx;
    this.uuid = data.uuid;
    this.email = data.email;
    this.name = data.name;
    this.createdAt = data.createdAt;
  }

  static createGroupEntity(data: Group): GroupEntity {
    return new GroupEntity({
      idx: data.idx,
      uuid: data.uuid,
      email: data.email,
      name: data.name,
      createdAt: data.createdAt,
    });
  }
}
