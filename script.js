import http from 'k6/http';
import { sleep, check } from  'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');
export const options = {
  vus: 1,
  duration: '5s',
};

const ec2GetAll = 'http://ec2-3-133-97-46.us-east-2.compute.amazonaws.com:8154/reviews/1/list';
const ec2GetMeta = 'http://ec2-3-133-97-46.us-east-2.compute.amazonaws.com:8154/reviews/1/meta';


export default () => {
  const res = http.get(ec2GetAll);
  const result = check(res, {
    'is status 200': (r) => r.status === 200,
  });
  errorRate.add(!result);
  sleep(1);
};