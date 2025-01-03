import React from "react";

const WeatherPage = React.memo(() => {
  return (
    <h1 className="text-xl font-semibold">
      Добро пожаловать! Тут вы можете узнать погоду
    </h1>
  );
});

export default WeatherPage;