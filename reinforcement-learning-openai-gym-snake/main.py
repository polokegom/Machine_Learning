import gym_snake_game
import gym

<<<<<<< HEAD:reinforcement-learning-openai-gym-snake/main.py
"Setup environment for Reinforcement (RL) Learning"
#env = gym.make('Snake-v0', render_mode='human')
=======
"Setup environment for Reinforcement Learnin (RL)"
env = gym.make('Snake-v0', render_mode='human')
>>>>>>> 7f305c4c326cdc20bce7ac57d8c8bb22d41898e0:snake-reinforcement-learning-openai-gym/main.py
env = gym_snake_game.make('Snake-v0', render_mode='human')

env.reset()
env.play()
env.close()
