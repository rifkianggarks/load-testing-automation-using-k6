import http from 'k6/http'
import { check, sleep, group } from 'k6'
const BASE_URL = 'https://reqres.in'

export default function () {
    const name = "morpheus"
    const job = "leader"
    const job2 = "zion resident"

    group('Create with valid request should success', function() {
            const FULL_URL_1 = BASE_URL + '/api/users';        
            const payload = JSON.stringify({
                "name": name,
                "job": job
            });
    
            const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = http.post(FULL_URL_1, payload, params);
        check(
            res,
            {
                'response code was 201': (res) => res.status == 201,
            },
        )

        check(
            res,
            {
                'respone name should same with request': (res) => {
                    const respone = JSON.parse(res.body)
                    return respone.name === name
                },
            },
        )

        check(
            res,
            {
                'response job should same with request': (res) => {
                    const response = JSON.parse(res.body)
                    return response.job === job
                } 
            }
        )
    })
    sleep(1)

    group('Update with valid request should success', function() {
        const FULL_URL_2 = BASE_URL + '/api/users/2';
        const payload = JSON.stringify({
            "name": name,
            "job2": job2
        })

        const params = {
            headers: {
                'content-type': 'application/json',
            },
        }

        const res = http.put(FULL_URL_2, payload, params);
        check(
            res,
            {
                'response code was 200': (res) => res.status == 200,
            },
        )

        check(
            res,
            {
                'respone name should same with request': (res) => {
                    const respone = JSON.parse(res.body)
                    return respone.name === name
                },
            },
        )

        check(
            res,
            {
                'response job should same with request': (res) => {
                    const response = JSON.parse(res.body)
                    return response.job2 == job2
                } 
            }
        )
    })
    sleep(1)
}