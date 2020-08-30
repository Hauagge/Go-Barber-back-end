import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSupplierService from '@modules/suppliers/services/CreateSupplierService';

import ListAllSupplierService from '@modules/suppliers/services/ListAllSupplierService';

export default class DonationController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, postCode, UF, city, line, phoneNumber } = request.body;

      const createSupplier = container.resolve(CreateSupplierService);

      const supplier = await createSupplier.execute({
        name,
        postCode,
        UF,
        city,
        line,
        phoneNumber,
      });

      return response.json(classToClass(supplier));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listSupplier = container.resolve(ListAllSupplierService);

    const suppliers = await listSupplier.execute();

    return response.json(classToClass(suppliers));
  }
}
