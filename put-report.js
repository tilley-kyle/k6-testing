import http from 'k6/http';
import { sleep, check } from  'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');
export const options = {
  stages: [
    {duration: '5s', target: 100},
    {duration: '20s', target: 500},
    {duration: '20s', target: 1000},
    {duration: '10s', target: 100}
  ]
};

const ec2Report = 'http://ec2-3-133-97-46.us-east-2.compute.amazonaws.com:8154/report/1';

export default () => {
  const id = Math.random() * 10000000 + 1;
  const res = http.put(`http://ec2-3-133-97-46.us-east-2.compute.amazonaws.com:8154/report/${id}`);
  const result = check(res, {
    'Is status 204': (r) => r.status === 204,
  });
  errorRate.add(!result);
  sleep(1);
};