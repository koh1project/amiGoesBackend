import { faker } from '@faker-js/faker';
import { TAmigos } from '../models/amigos';
import { TGenderValues } from '../types/types';

export const seedUser = () => {
  const users: TAmigos[] = [];
  for (let i = 0; i < 10; i++) {
    let user: TAmigos;
    user.name = faker.name.firstName();
    user.bio = faker.lorem.paragraph();
    user.birthday = faker.date.past(18);
    user.connectPreferences = {
      activities: faker.helpers.uniqueArray(faker.word.adjective, 5),
      currentLocation: {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
      },
      fromDate: faker.date.recent(),
      toDate: faker.date.soon(),
      gender: faker.name.sex() as TGenderValues,
      isInvisible: faker.datatype.boolean(),
      maxAge: faker.datatype.number({
        min: 40,
        max: 80,
      }),
      minAge: faker.datatype.number({
        min: 40,
        max: 80,
      }),
    };
    user.gender = faker.name.sex() as TGenderValues;
    user.contact = {
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
    };
    users.push(user);
  }
  console.log(users);
};
