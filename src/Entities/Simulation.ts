import { getModelForClass } from '@typegoose/typegoose';
import Simulation from '../Schemas/Simulation';

const SimulationModel = getModelForClass(Simulation, {
  schemaOptions: { timestamps: true },
});

export default SimulationModel;
