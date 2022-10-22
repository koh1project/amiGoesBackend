import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import AmigosModel, { TAmigos } from '../models/amigos';
import ConnectionsModel, { TConnections } from '../models/connections';
import { TGenderValues } from '../types/types';

function generateRandomString() {
  return Math.random().toString(20).substr(2, 20);
}

export const seed = async () => {
  const users = await seedUser();
  const connections = await seedConnections(users);
  AmigosModel.insertMany(users);
  ConnectionsModel.insertMany(connections);
  return { users, connections };
};
export const removeAllData = async () => {
  AmigosModel.remove({});
  ConnectionsModel.remove({});
};

export const seedUser = async () => {
  const users: TAmigos[] = [];
  for (let i = 0; i < 10; i++) {
    //const id = new Types.ObjectId();

    const id = generateRandomString();

    const user: TAmigos = {
      _id: id,
      name: faker.name.firstName(),
      birthday: faker.date.past(1, new Date('1995/06/16')),
      bio: faker.lorem.paragraph(),
      connectPreferences: {
        activities: faker.helpers.uniqueArray(faker.word.adjective, 5),
        currentLocation: {
          latitude: faker.address.latitude(),
          longitude: faker.address.longitude(),
        },
        fromDate: faker.date.recent(),
        toDate: faker.date.soon(),
        gender: faker.helpers.arrayElements(['male', 'female', 'other']),
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
      gender: faker.name.sex() as TGenderValues,
      contact: {
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
      },
      languages: faker.helpers.uniqueArray(
        ['English', 'Spanish', 'Portuguese'],
        1,
      ),
      hobbies: faker.helpers.uniqueArray(['Reading', 'Writing', 'Sleeping'], 1),
      favorites: faker.helpers
        .uniqueArray(users, 1)
        .map((user) => user?._id.toString()),
      homeCountry: faker.helpers.arrayElement(['Brazil', 'Japan', 'Mexico']),
      isVerified: faker.datatype.boolean(),
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
