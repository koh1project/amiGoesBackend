import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import AmigosModel, { TAmigos } from '../models/amigos';
import ConnectionsModel, { TConnections } from '../models/connections';
import { TGenderValues } from '../types/types';

function generateRandomString() {
  return Math.random().toString(20).substr(2, 20);
}
const malePhotos = [
  'male-1.jpg',
  'male-2.jpg',
  'male-3.jpg',
  'male-4.jpg',
  'male-5.jpg',
];
const femalePhotos = [
  'female-1.jpg',
  'female-2.jpg',
  'female-3.jpg',
  'female-4.jpg',
];

export const seed = async () => {
  await removeAllData();
  const users = await seedUser();
  // const connections = await seedConnections(users);
  AmigosModel.insertMany(users);
  // ConnectionsModel.insertMany(connections);
  return { users };
};

export const removeAllData = async () => {
  await AmigosModel.deleteMany({});
  await ConnectionsModel.deleteMany({});
};

export const seedUser = async () => {
  const users: TAmigos[] = [];
  for (let i = 0; i < 10; i++) {
    //const id = new Types.ObjectId();

    const id = generateRandomString();
    const gender = faker.name.sex() === 'male' ? 'Male' : 'Female';

    const user: TAmigos = {
      _id: id,
      name: faker.name.fullName({
        sex: gender.toLowerCase() as 'male' | 'female',
      }),
      birthday: faker.date.past(1, new Date('1980/06/16')),
      age: faker.datatype.number({ min: 18, max: 70 }),
      bio: faker.lorem.paragraph(),
      connectPreferences: {
        activities: faker.helpers.uniqueArray(faker.word.adjective, 5),
        currentLocation: {
          latitude:
            49.246292 +
            Math.random() *
              faker.helpers.arrayElement([0.01, 0.001, 0.05]) *
              faker.helpers.arrayElement([1, -1]),
          longitude:
            -123.116226 +
            Math.random() *
              faker.helpers.arrayElement([0.01, 0.001, 0.05]) *
              faker.helpers.arrayElement([1, -1]),
        },
        locationDistance: faker.datatype.number({ min: 10, max: 1000 }),
        fromDate: faker.date.recent(),
        toDate: faker.date.soon(),
        fromTime: faker.datatype.number({ min: 800, max: 900 }),
        toTime: faker.datatype.number({ min: 1700, max: 2200 }),
        gender: [faker.name.sex().toLowerCase() as TGenderValues],
        isInvisible: faker.datatype.boolean(),
        maxAge: faker.datatype.number({
          min: 40,
          max: 80,
        }),
        minAge: faker.datatype.number({
          min: 40,
          max: 80,
        }),
      },
      gender: gender,
      contact: {
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
      },
      languages: faker.helpers.uniqueArray(
        ['English', 'Spanish', 'Portuguese'],
        1,
      ),
      hobbies: faker.helpers.uniqueArray(
        ['Reading', 'Writing', 'Hiking', 'Skiing'],
        1,
      ),
      favorites: faker.helpers
        .uniqueArray(users, 1)
        .map((user) => user?._id.toString()),
      homeCountry: faker.helpers.arrayElement(['Brazil', 'Japan', 'Mexico']),
      isVerified: faker.datatype.boolean(),
      profilePicture:
        gender === 'Male'
          ? faker.helpers.arrayElement(malePhotos)
          : faker.helpers.arrayElement(femalePhotos),
    };
    users.push(user);
  }
  return users;
};

export const seedConnections = async (users: TAmigos[] = []) => {
  let seedUsers: TAmigos[] = [];
  console.log({ users });
  if (users.length) {
    seedUsers = users;
  } else {
    seedUsers = await AmigosModel.find({});
  }
  const connections: TConnections[] = [];

  for (let i = 0; i < 10; i++) {
    const users = faker.helpers.uniqueArray(seedUsers, 2);
    const bool = faker.datatype.boolean();
    const id = new Types.ObjectId();

    const connection: TConnections = new ConnectionsModel({
      _id: id,
      userID1: users[0]._id,
      userID2: users[1]._id,
      isConnected: bool,
      isPending: !bool,
    });
    connections.push(connection);
  }
  console.log({ connections });

  return connections;
};
//  TODO: Need to find a way to generate Go Pairs
export const goNowPairs = () => {
  // TODO
  throw Error('Function not implemented');
};
