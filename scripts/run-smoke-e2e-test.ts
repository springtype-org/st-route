import { execSync } from 'child_process';

const packageDir = './e2e/smoke';

const stopServe = () => {
  execSync('node node_modules/.bin/forever stopall', {
    stdio: 'inherit',
  });
};

try {
  process.chdir(packageDir);

  console.log(`[i] Installing e2e project ${packageDir}...`);
  execSync('yarn', {
    stdio: 'inherit',
  });

  console.log(`[i] Building e2e project ${packageDir}...`);
  execSync('yarn build', {
    stdio: 'inherit',
  });

  console.log(`[i] Start serving e2e project ${packageDir}...`);
  execSync('yarn serve:start', {
    stdio: 'inherit',
  });

  console.log(`[i] Run end-2-end tests for project ${packageDir}...`);
  execSync('yarn e2e', {
    stdio: 'inherit',
  });

  console.log(`[i] Stop serving e2e project ${packageDir}...`);

  stopServe();

  process.chdir('../../');
} catch (e) {
  stopServe();
}
