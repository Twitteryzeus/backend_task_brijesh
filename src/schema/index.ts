import mongoose from 'mongoose';
import { envConfigs } from '../config';

mongoose.connect(envConfigs.mongo.dbUrl);

export default mongoose