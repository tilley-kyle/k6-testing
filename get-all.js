import http from 'k6/http';
import { sleep, check } from  'k6';
import { Rate, Trend } from 'k6/metrics';

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

const ec2GetAll = 'http://ec2-3-133-97-46.us-east-2.compute.amazonaws.com:8154/reviews/1/list';

export default () => {
  const id = Math.random() * 10000000 + 1;
  const res = http.get(`http://ec2-3-133-97-46.us-east-2.compute.amazonaws.com:8154/reviews/${id}/list`);
  const result = check(res, {
    'Is status 200': (r) => r.status === 200,
  });
  errorRate.add(!result);
  sleep(1);
};