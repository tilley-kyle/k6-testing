import http from 'k6/http';
import { sleep, check } from  'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');
export const options = {
  vus: 1500,
  duration: '30s'
  // stages: [
  //   {duration: '10s', target: 100},
  //   {duration: '60s', target: 300}
  //   {duration: '10s', target: 100}
  // ]
};

const ec2Helpful = 'http://ec2-3-133-97-46.us-east-2.compute.amazonaws.com:8154/reviews/helpful/1';

export default () => {
  const id = Math.random() * 10000000 + 1;
  const res = http.put(`http://ec2-3-133-97-46.us-east-2.compute.amazonaws.com:8154/reviews/helpful/${id}`);
  const result = check(res, {
    'Is status 204': (r) => r.status === 204,
  });
  errorRate.add(!result);
  sleep(1);
};