import { Observable, of, from, defer, interval } from 'rxjs';
import { map, filter, share } from 'rxjs/operators';
import * as _ from 'lodash';

const log = (val: any) => document.write(JSON.stringify(val) + '<br>');

/*
const toUpperCase =
    function() {
        return function(source: Observable<any>) {
            return new Observable(
                function(observer) {
                    return source.subscribe({
                        next(x) {
                            observer.next(x.toUpperCase());
                        },
                        error(err) { observer.error(err); },
                        complete() { observer.complete(); }
                    });
                }
            );
        };
    };
*/

/*
const pow =
    function() {
        return function(source: Observable<any>) {
            return new Observable(
                function(observer) {
                    return source.subscribe({
                        next(x) {
                            observer.next(Math.pow(x, n));
                        },
                        error(err) { observer.error(err); },
                        complete() { observer.complete(); }
                    });
                }
            );
        };
    };
*/

const toUpperCase =
    () =>
        (source: Observable<any>) =>
            new Observable(
                observer =>
                    source.subscribe({
                        next(x) {
                            observer.next(x.toUpperCase());
                        },
                        error(err) { observer.error(err); },
                        complete() { observer.complete(); }
                    })
            );
/*
const pow =
    (n: number) =>
        (source: Observable<any>) =>
            new Observable(
                observer =>
                    source.subscribe({
                        next(x) {
                            observer.next(
                                Math.pow(x, n)
                            );
                        },
                        error(err) { observer.error(err); },
                        complete() { observer.complete(); }
                    })
            );
*/

const pow = (n: number) => map((x: number) =>
    Math.pow(x, n)
);

of('hello').pipe(toUpperCase()).subscribe(log);

of(2).pipe(pow(10)).subscribe(log);

const pickNumbers = () => map(x =>
    _.pickBy(x, _.isNumber)
)

const obs = of({
    'foo': 1,
    'bar': 'str',
    'baz': 3
})

obs.pipe(pickNumbers()).subscribe(log);

const numbersOnly = () => filter(_.isNumber);

const obs2 = from([1, 2, '3', '4', 5]);

obs2.pipe(numbersOnly()).subscribe(log);

const stateful =
    () =>
        (source: Observable<any>) =>
            defer(() => {
                let state = Math.random().toString();
                return source.pipe(
                    map(next => {
                        state = state + '--' + next;
                        return state;
                    }),
                    // tap(...do something with state),
                    // switchMap( ... do something with state),
                    // filter( ... do something with state)
                )
            });

const stateObs = interval(1000).pipe(stateful(), share());

stateObs.subscribe(log);
stateObs.subscribe(log);
