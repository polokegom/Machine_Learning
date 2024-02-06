import gym_snake_game
import gym

"Setup environment for Reinforcement (RL) Learning"
#env = gym.make('Snake-v0', render_mode='human')
env = gym_snake_game.make('Snake-v0', render_mode='human')

env.reset()
env.play()
env.close()