import { rimrafSync } from 'rimraf';
import { Utility } from '../utilities/utils'

async function globalSetup() : Promise<void>{
    rimrafSync('./allure-reports');
    rimrafSync('./allure-results/');
    rimrafSync('./output');
    rimrafSync('./downloads');
    const utility = new Utility();
    utility.makeDir('./output/');
    utility.makeDir('./downloads/');
    console.log('Start Testing', new Date().toLocaleString());
}
export default globalSetup;
