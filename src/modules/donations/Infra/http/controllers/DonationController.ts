import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDonationService from '@modules/donations/services/CreateDonationService';

import ShowDonationService from '@modules/donations/services/ShowAllDonationService';

export default class DonationController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.params;
      const { supplier_id, value } = request.body;

      const createDonation = container.resolve(CreateDonationService);

      const user = await createDonation.execute({
        user_id,
        supplier_id,
        value,
      });

      return response.json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showDonation = container.resolve(ShowDonationService);

    const donation = await showDonation.execute({ id });

    return response.json(classToClass(donation));
  }
}
