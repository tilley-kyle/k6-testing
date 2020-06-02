import http from 'k6/http';
import { sleep, check } from  'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');
export const options = {
  stages: [
    {duration: '10s', target: 100},
    {duration: '10s', target: 1000},
    {duration: '10s', target: 100}
  ]
};


export default () => {
  const id = Math.random() * 10000 + 1;
  const res = http.post(`http://ec2-3-23-131-54.us-east-2.compute.amazonaws.com:8154/reviews/${id}`);
  const result = check(res, {
    'Is status 201': (r) => r.status === 201,
  });
  errorRate.add(!result);
  sleep(1);
};