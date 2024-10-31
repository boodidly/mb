import chalk from 'chalk';
import inquirer from 'inquirer';
import fetch from 'node-fetch';
import ora from 'ora';

const OLLAMA_API = 'http://localhost:11434/api';

const models = {
  llama2: '🦙 Llama 2',
  codellama: '👨‍💻 Code Llama',
  mistral: '🌪 Mistral',
  neural: '🧠 Neural Chat',
};

const spinner = ora({
  text: 'Thinking...',
  color: 'cyan',
});

async function checkOllamaServer() {
  try {
    const response = await fetch(`${OLLAMA_API}/tags`);
    if (!response.ok) throw new Error('Ollama server not responding');
    return true;
  } catch (error) {
    console.log(chalk.red('❌ Error: Ollama server is not running'));
    console.log(chalk.yellow('ℹ️  Make sure Ollama is installed and running on your system'));
    return false;
  }
}

async function chat() {
  console.clear();
  console.log(chalk.cyan.bold('🤖 Ollama Terminal Chat'));
  console.log(chalk.dim('─'.repeat(50)));

  if (!await checkOllamaServer()) return;

  const { model } = await inquirer.prompt([{
    type: 'list',
    name: 'model',
    message: 'Choose a model:',
    choices: Object.entries(models).map(([id, name]) => ({
      name,
      value: id
    }))
  }]);

  console.log(chalk.dim('─'.repeat(50)));
  console.log(chalk.green(`Using model: ${models[model]}`));
  console.log(chalk.dim('Type "exit" to quit'));
  console.log(chalk.dim('─'.repeat(50)));

  while (true) {
    const { prompt } = await inquirer.prompt([{
      type: 'input',
      name: 'prompt',
      message: chalk.blue('You:'),
    }]);

    if (prompt.toLowerCase() === 'exit') break;

    spinner.start();

    try {
      const response = await fetch(`${OLLAMA_API}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          prompt,
          stream: false
        })
      });

      const data = await response.json();
      spinner.stop();
      console.log(chalk.yellow('\nAI:'), chalk.white(data.response));
      console.log(chalk.dim('─'.repeat(50)));
    } catch (error) {
      spinner.stop();
      console.log(chalk.red('\n❌ Error:'), error.message);
      console.log(chalk.dim('─'.repeat(50)));
    }
  }

  console.log(chalk.cyan('\n👋 Thanks for chatting!'));
}

chat();