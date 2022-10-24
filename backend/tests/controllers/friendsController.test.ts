import app from '../../src/app';
import request from 'supertest';
import { friendService } from '../../src/services/friendsService';
import { foodService } from '../../src/services/foodsService';

describe('friendsController.addNewFriend()', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('Error code 400 when no Friend data is provided', async () => {
    //Arrange
    //Act
    const result = await request(app).post('/api/friends').send({});

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when name is not provided', async () => {
    //Arrange
    const friendData = {
      email: 'example@example.com',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).post('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when email is not provided', async () => {
    //Arrange
    const friendData = {
      name: 'John Smith',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).post('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when favorite food is not provided', async () => {
    //Arrange
    const friendData = {
      name: 'John Smith',
      email: 'example@example.com',
      comment: 'he likes football',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).post('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code is 400 when relationship status is not provided', async () => {
    //Arrange
    const friendData = {
      name: 'John Smith',
      email: 'example@example.com',
      comment: 'he likes football',
      favFood: 'shushi',
    };

    //Act
    const result = await request(app).post('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when email is not valid', async () => {
    //Arrange
    const friendData = {
      name: 'John Smith',
      email: 'example.com',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).post('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when name is less then 4 charachter', async () => {
    //Arrange
    const friendData = {
      name: 'JS',
      email: 'example@example.com',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).post('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when comment is longer than 30 charachters', async () => {
    //Arrange
    const friendData = {
      name: 'John Smith',
      email: 'example@example.com',
      comment:
        'He likes football, his favorite team is Man Utd. Poor guy what a pitty. Manchester has only one color and it is blue!',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).post('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 500 when service fails', async () => {
    //Arrange
    const friendData = {
      name: 'John Smith',
      email: 'example@example.com',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    friendService.addNewFriend = jest.fn().mockRejectedValue('error');

    //Act
    const result = await request(app).post('/api/friends').send(friendData);

    //Assert
    expect(friendService.addNewFriend).toHaveBeenCalledWith(friendData);
    expect(friendService.addNewFriend).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toEqual(500);
  });

  it('Friend added to the db successfully!', async () => {
    //Arrange
    const friendData = {
      name: 'John Smith',
      email: 'example@example.com',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    const foodData = {
      friendId: 1,
      favFood: 'shushi',
    };

    friendService.addNewFriend = jest.fn().mockResolvedValue(1);
    foodService.addNewFood = jest.fn();

    //Act
    const result = await request(app).post('/api/friends').send(friendData);

    //Assert
    expect(friendService.addNewFriend).toHaveBeenCalledWith(friendData);
    expect(friendService.addNewFriend).toHaveBeenCalledTimes(1);
    expect(foodService.addNewFood).toHaveBeenCalledWith(foodData);
    expect(foodService.addNewFood).toHaveBeenCalledTimes(1);
    expect(result.body).toEqual({ friendId: 1 });
    expect(result.statusCode).toEqual(201);
  });
});
