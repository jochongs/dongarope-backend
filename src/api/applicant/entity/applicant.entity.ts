import { Applicant } from '@prisma/client';

export class ApplicantEntity {
  idx: number;
  name: string;
  email: string;
  createdAt: Date;

  constructor(data: {
    idx: number;
    name: string;
    email: string;
    createdAt: Date;
  }) {
    this.idx = data.idx;
    this.name = data.name;
    this.email = data.email;
    this.createdAt = data.createdAt;
  }

  static createApplicantEntity(applicant: Applicant): ApplicantEntity {
    return new ApplicantEntity({
      idx: applicant.idx,
      name: applicant.name,
      email: applicant.email,
      createdAt: applicant.createdAt,
    });
  }
}
