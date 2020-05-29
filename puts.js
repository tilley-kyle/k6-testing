import http from 'k6/http';
import { sleep, check } from  'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');
export const options = {
  vus: 1,
  duration: '5s',
};

export default () => {
  const res = http.put(ec2Helpful);
  const result = check(res, {
    'is status 204': (r) => r.status === 204,
  });
  errorRate.add(!result);
  sleep(1);
};