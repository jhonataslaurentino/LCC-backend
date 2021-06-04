import { getModelForClass } from '@typegoose/typegoose';
import Simulation from '../schemas/Simulation';

const SimulationModel = getModelForClass(Simulation, {
  schemaOptions: { timestamps: true },
});

export { SimulationModel };
