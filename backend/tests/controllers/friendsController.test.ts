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

describe('friendsController.getAllFriends', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('Error code 500 when server fails', async () => {
    //Arrange
    friendService.getAllFriends = jest.fn().mockRejectedValue('error');

    //Act
    const result = await request(app).get('/api/friends').send();

    //Assert
    expect(friendService.getAllFriends).toHaveBeenCalledWith();
    expect(friendService.getAllFriends).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toEqual(500);
  });

  it('proper object is sent', async () => {
    //Arrange
    const friendList = [
      {
        id: 1,
        name: 'John Smith',
        email: 'example@example.com',
        comment: 'he likes football',
        favFood: 'shushi',
        relationshipStatus: 1,
      },
      {
        id: 2,
        name: 'Carol Smith',
        email: 'example@example.com',
        comment: 'she likes volleyball',
        favFood: 'pizza',
        relationshipStatus: 2,
      },
    ];
    friendService.getAllFriends = jest.fn().mockResolvedValue(friendList);
    //Act

    const result = await request(app).get('/api/friends').send();

    //Assert
    expect(friendService.getAllFriends).toHaveBeenCalledWith();
    expect(friendService.getAllFriends).toHaveBeenCalledTimes(1);
    expect(result.body).toEqual(friendList);
    expect(result.statusCode).toEqual(200);
  });
});

describe('friendsController.getFriend()', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('Error code 400 when friendId is not a number', async () => {
    //Arrange
    //Act
    const result = await request(app).get('/api/friends/three').send();

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 500 when service fails', async () => {
    //Arrange
    const friendId = 2;
    friendService.getFriendById = jest.fn().mockRejectedValue('error');

    //Act
    const result = await request(app).get(`/api/friends/${friendId}`).send();
    //Assert
    expect(friendService.getFriendById).toHaveBeenCalledWith(friendId);
    expect(friendService.getFriendById).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toEqual(500);
  });

  it('proper object is sent', async () => {
    //Arrange
    const friendId = 10;

    const friendData = {
      id: 1,
      name: 'John Smith',
      email: 'example@example.com',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    friendService.getFriendById = jest.fn().mockResolvedValue(friendData);

    //Act
    const result = await request(app).get(`/api/friends/${friendId}`).send();

    //Assert
    expect(friendService.getFriendById).toHaveBeenCalledWith(friendId);
    expect(friendService.getFriendById).toHaveBeenCalledTimes(1);
    expect(result.body).toEqual(friendData);
    expect(result.statusCode).toEqual(200);
  });
});

describe('friendsController.deleteFriend()', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('Error code 400 when friend id is not a number', async () => {
    //Arrange
    friendService.deleteFriend = jest.fn().mockRejectedValue('error');

    //Act
    const result = await request(app).delete('/api/friends/three').send();

    //Assert
    expect(friendService.deleteFriend).toHaveBeenCalledTimes(0);
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 500 when server fails', async () => {
    //Arrange
    const friendId = 1;
    friendService.deleteFriend = jest.fn().mockRejectedValue('error');

    //Act
    const result = await request(app).delete(`/api/friends/${friendId}`).send();

    //Assert
    expect(friendService.deleteFriend).toHaveBeenCalledTimes(1);
    expect(friendService.deleteFriend).toHaveBeenCalledWith(`${friendId}`);
    expect(result.statusCode).toEqual(500);
  });
});

describe('friendsController.editFriend()', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('Error code 400 when no Friend data is provided', async () => {
    //Arrange
    //Act
    const result = await request(app).put('/api/friends').send({});

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when name is not provided', async () => {
    //Arrange
    const friendData = {
      friendId: 1,
      email: 'example@example.com',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).put('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when email is not provided', async () => {
    //Arrange
    const friendData = {
      friendId: 1,
      name: 'John Smith',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).put('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when favorite food is not provided', async () => {
    //Arrange
    const friendData = {
      friendId: 1,
      name: 'John Smith',
      email: 'example@example.com',
      comment: 'he likes football',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).put('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code is 400 when relationship status is not provided', async () => {
    //Arrange
    const friendData = {
      friendId: 1,
      name: 'John Smith',
      email: 'example@example.com',
      comment: 'he likes football',
      favFood: 'shushi',
    };

    //Act
    const result = await request(app).put('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when email is not valid', async () => {
    //Arrange
    const friendData = {
      friendId: 1,
      name: 'John Smith',
      email: 'example.com',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).put('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when name is less then 4 charachter', async () => {
    //Arrange
    const friendData = {
      friendId: 1,
      name: 'JS',
      email: 'example@example.com',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).put('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when comment is longer than 30 charachters', async () => {
    //Arrange
    const friendData = {
      friendId: 1,
      name: 'John Smith',
      email: 'example@example.com',
      comment:
        'He likes football, his favorite team is Man Utd. Poor guy what a pitty. Manchester has only one color and it is blue!',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    //Act
    const result = await request(app).put('/api/friends').send(friendData);

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 500 when service fails', async () => {
    //Arrange
    const friendData = {
      friendId: 1,
      name: 'John Smith',
      email: 'example@example.com',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };

    friendService.editFriend = jest.fn().mockRejectedValue('error');

    //Act
    const result = await request(app).put('/api/friends').send(friendData);

    //Assert
    expect(friendService.editFriend).toHaveBeenCalledWith(friendData);
    expect(friendService.editFriend).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toEqual(500);
  });

  it('Friend data modified', async () => {
    //Arrange
    const friendData = {
      friendId: 1,
      name: 'John Smith',
      email: 'example@example.com',
      comment: 'he likes football',
      favFood: 'shushi',
      relationshipStatus: 1,
    };
    friendService.editFriend = jest.fn().mockResolvedValue(friendData);

    //Act
    const result = await request(app).put('/api/friends').send(friendData);

    //Assert
    expect(friendService.editFriend).toHaveBeenCalledWith(friendData);
    expect(friendService.editFriend).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toEqual(200);
  });
});
