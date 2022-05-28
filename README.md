# React-query

https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2

https://react-query.tanstack.com/overview

https://kyounghwan01.github.io/blog/React/react-query/basic/#usequery

## What is?

리액트 어플리케이션에서 데이타를 fetching하는 라이브러리

## Why

1.  특정한 데이터 패칭 패턴이 없었다.

2.  useEffect 훅으로 데이터를 패칭하고 useState로 컴포넌트 내 state에서 loading, error나 결과 데이터를 유지해야했다.

3.  만약 데이터가 어플리케이션에 머무는 내내 필요하다면, 전역 상태 관리 라이브러리들로 유지하려는 경향들이 있다.

4.  대부분의 상태관리 라이브러리들은 정작 client State를 관리하는데 효율이 좋았다.

5.  대부분의 상태관리 라이브러리들은 비동기나 server state 작업에서 안좋다.
    - 캐싱... (아마도 프로그래밍에서 가장 어려운 일)
    - 동일한 데이터에 대한 여러 요청을 단일 요청으로 중복 제거
    - 백그라운드에서 "오래된" 데이터 업데이트
    - 데이터가 "오래된" 경우 파악
    - 데이터 업데이트를 최대한 빨리 반영
    - 페이지 매김 및 지연 로딩 데이터와 같은 성능 최적화
    - 서버 상태의 메모리 및 가비지 수집 관리
    - 구조적 공유를 통한 쿼리 결과 메모

```
React Query는 서버 상태를 관리하는 데 가장 좋은 라이브러리 중 하나입니다.
제로 구성으로 놀라울 정도로 즉시 사용할 수 있으며,
애플리케이션의 성장에 따라 원하는 대로 사용자 지정할 수 있습니다.
```

<br/>

## 예전 데이터 패칭 방식

```jsx
const RQSuperHeroesPage = () => {
	// fetching 관련 state 만들고
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		// useEffect에서 비동기함수 마운트에 실행하고
		axios.get("http://localhost:4000/superheroes").then((res) => {
			setData(res.data);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	return (
		<>
			<h2>Super Heroes Page</h2>
			{data.map((hero) => {
				return <div>{hero.name}</div>;
			})}
		</>
	);
};
```

> 이제 react-query로 3줄안에 구현할 수 있다.

```jsx
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
	return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
	// useQuery 훅스의 첫번째 인자는 key, 이걸로 유니크한 아이디를 만들어 캐싱데이터를 저장하고 추적한다.
	// 두번째는 promise을 리턴하는 함수다.
	const { isLoading, data } = useQuery("super-heroes", fetchSuperHeroes);

	if (isLoading) {
		return <h2>Loading...</h2>;
	}
	return (
		<>
			<h2>Super Heroes Page</h2>
			{data?.data.map((hero) => {
				return <div key={hero.name}>{hero.name}</div>;
			})}
		</>
	);
};

export default RQSuperHeroesPage;
```

## Devtools

react-query에서는 시각적으로 확인할 수 있게 devtool도 지원한다.

```tsx
import { ReactQueryDevtools } from "react-query/devtools";

export default () => {
	return (
		<>
			<ReactQueryDevtools initialisOpen={false} position='botton-right' />
			// 브라우저에서 Next.js처럼 devtool 아이콘 확인 가능
		</>
	);
};
```

<img src="./docs_img/devtools2.png"/>

<br/>

## Cache

네트워크 탭에서 네트워크 속도를 낮추고 페이지를 왔다리 갔다리 해보면

첫 요청 이후로 loading없이 데이터가 바로 오는 걸 확인할 수 있다.

**react-query에서 캐싱된 데이터를 가져왔기 때문이다.**

```tsx
const { isLoading, data, error, isError } = useQuery(
	"super-heroes",
	fetchSuperHeroes,
	{
		cacheTime: 5000, // 기본적으로 5분마다 삭제되지만 조정할 수도 있다.
	}
);
```

## StaleTime

    클라이언트가 fetch를 해 데이터(Fresh)를 받고나서 서버단이 데이터를 업데이트한다고 하면

    그때부터 클라이언트의 데이터(Stale)과 서버단의 데이터가 다를 것이다.

    이런 의미에서 Fresh/Stale로 구분한다.

### 1. Fresh

<img src="./docs_img/stale2.png" />

<em>fetch를 한 후 30초동안은 fresh 상태에 머무르는데 이때는 아래 명시된 상황이 있어도 refetch를 하지 않는다.</em>

### 2. Stale

<img src="./docs_img/stale1.png" />

Fetch 후 데이터는 Fresh 상태에서 `stale("뜻: 상한, 낡은") 상태`로 전환되며

다음 경우에 refetch를 한다.

    1. page를 이동 했다가 왔을 때, 새로운 query instance가 마운트 될 때 (refetchOnMount)

    2. 브라우저 화면을 이탈 했다가 다시 focus 할 때 (refetchOnWindowFocus)

    3. 네트워크가 다시 연결될 때 (refetchOnReconnect)

    4. 특별히 설정한 refetch interval에 의한 경우 (refetchInterval)

관련상황마다 option으로 refetch를 할지 말지 정할 수 있다

```ts
const { isLoading, data, error, isError } = useQuery(
	"super-heroes",
	fetchSuperHeroes,
	{
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchInterval: false, // 숫자를 주면 폴링 기능 (주기적으로 refetch)
	}
);
```

### 3. StaleTime을 쓰는 이유

랜딩 페이지의 소개글처럼 바뀔 일 없는 데이터는 굳이 refetch를 하는 게 불만일수 있다.

> staleTime 옵션은 data가 fresh에서 stale로 전환되는 시간을 의미한다.

```tsx
const { isLoading, data, error, isError } = useQuery(
	"super-heroes",
	fetchSuperHeroes,
	{
		staleTime: 30000,
	}
);
```

네트워크탭에서 staleTime의 시간동안 refetch가 일어나지않는 걸 확인할 수 있다.

## enabled 옵션

```tsx
const { isLoading, data, error, isError } = useQuery(
	"super-heroes",
	fetchSuperHeroes,
	{
		enabled: false,
		// enable의 값을 flag로 우리가 원하는 시점에 fetch하게 할 수 있다.
	}
);
```

## callback

요청 성공 시, 실패 시에 콜백을 실행시킬 수 있다.

```tsx
const onSuccess = (data: HeroResponseTypes) => {
	console.log(data);
};

const onError = (e: Error) => {
	console.log(e.message);
};

const { isLoading, data, error } = useQuery("super-heroes", fetchSuperHeroes, {
	onSuccess,
	onError,
});
```

## data transform

select 옵션은 인자로 응답 데이터를 주고 변형할 수 있게 도와준다.

```tsx
const RQSuperHeroesPage = () => {
	const { data } = useQuery("super-heroes", fetchSuperHeroes, {
		select: (data) => {
			const newData = data.data.map((v) => ({
				...v,
				name: v.name ?? "홍길동",
				// 만약 빈값이면 디폴트값 주게 설정
			}));

			return { ...data, data: newData };
		},
	});

	return (
		<>
			{data?.data.map((hero) => {
				return <div key={hero.name}>{hero.name}</div>;
			})}
		</>
	);
};

export default RQSuperHeroesPage;
```

## custom hooks

```ts
// useSuperhero.js
import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
	return axios.get("http://localhost:4000/superheroes");
};

export default () => {
	return useQuery("super-heroes", fetchSuperHeroes);
};
```

> 자주 쓰이는 url 쿼리거나 로직이 복잡하여 분리하고 싶다면 커스텀 훅스로 만들면 좋다.

```ts
// RQSuperHeroesPage.jsx
import useSuperHeroes from "../hooks/useSuperHeroes";

const RQSuperHeroesPage = () => {
	const { data } = useSuperHeroes();

	return (
		<>
			<h2>Super Heroes Page</h2>
			{data?.data.map((hero) => {
				return <div key={hero.name}>{hero.name}</div>;
			})}
		</>
	);
};

export default RQSuperHeroesPage;
```

## Query by Id

<img src="./docs_img/queryById1.png" />

useQuery의 첫 번째 인자인 유니크 키는 string 또는 배열을 받는데

해당 요청의 관련 parameter들을 같이 등록할 수 있다.

```ts
import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = ({ queryKey }) => {
	const heroId = queryKey[1];
	return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export default (heroId) => {
	return useQuery(["super-hero-data", heroId], fetchSuperHeroes);
};
```
