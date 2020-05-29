import http from 'k6/http';
import { sleep, check } from  'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');
export const options = {
  vus: 1,
  duration: '5s',
};

const ec2Helpful = 'http://ec2-3-133-97-46.us-east-2.compute.amazonaws.com:8154/reviews/helpful/1';
const ec2Report = 'http://ec2-3-133-97-46.us-east-2.compute.amazonaws.com:8154/report/1';

export default () => {
  const res = http.put(ec2Helpful);
  const result = check(res, {
    'is status 204': (r) => r.status === 204,
  });
  errorRate.add(!result);
  sleep(1);
};