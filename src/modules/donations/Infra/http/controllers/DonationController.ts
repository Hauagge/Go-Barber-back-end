import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import mercadopago from 'mercadopago';

import CreateDonationService from '@modules/donations/services/CreateDonationService';

import ShowDonationService from '@modules/donations/services/ShowAllDonationService';

export default class DonationController {
  public async create(request: Request, response: Response): Promise<any> {
    try {
      const { user_id } = request.params;
      const { supplier_id, value, email } = request.body;

      mercadopago.configure({
        sandbox: true,
        access_token: process.env.ACCESS_TOKEN_TEST,
      });

      // Create purchase item object template
      const purchaseOrder = {
        items: [
          {
            id: user_id,
            title: 'donation',
            description: 'donation',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: value,
          },
        ],
        payer: {
          email,
        },
        auto_return: 'all',
        external_reference: user_id,
        back_urls: {
          success: `${process.env.APP_WEB_URL}/payments/success`,
          pending: `${process.env.APP_WEB_URL}/payments/pending`,
          failure: `${process.env.APP_WEB_URL}/payments/failure`,
        },
      };

      const preference = await mercadopago.preferences.create(purchaseOrder);

      console.log(preference);

      const createDonation = container.resolve(CreateDonationService);

      await createDonation.execute({
        user_id,
        supplier_id,
        value,
      });

      return response.redirect(`${preference.body.init_point}`);
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
