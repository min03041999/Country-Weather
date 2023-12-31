import { useEffect, useState } from "react";
import bgImage from "./assets/Weather1.jpg";
import Weather from "./components/Weather";
import { BiSearch } from "react-icons/bi";

import "./App.css";

function App() {
  const [countries, setCountries] = useState();
  const [list, setList] = useState();
  const [input, setInput] = useState("");

  useEffect(() => {
    const url = "https://restcountries.com/v3.1/all";

    fetch(url)
      .then((response) => response.json())
      .then(
        (response) => {
          setCountries(response);
          console.log(response);
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);

  const getCountry = (e) => {
    setInput(e.target.value.toLowerCase());

    const newCountries = countries.filter((ele) =>
      ele.name.common.toLowerCase().includes(input)
    );

    setList(newCountries);
  };

  const showCountry = (index) => {
    setList([list[index]]);
  };

  return (
    <div
      className="h-screen bg-center bg-cover bg-no-repeat object-cover py-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="mx-auto w-4/5 lg:w-2/5 h-full">
        <div className="flex items-center border-2 justify-between px-4 py-3 rounded-xl mb-2">
          <input
            className="bg-transparent focus:outline-none text-white md:text-xl placeholder:text-white"
            type="text"
            onChange={getCountry}
            placeholder="Search by country name"
          />
          <BiSearch size={25} color="white" />
        </div>

        {input === "" ? null : list?.length > 5 ? (
          <p className="text-white text-center tracking-wider opacity-80">
            Too many matches, please be more specific.
          </p>
        ) : (
          list?.map((item, index) => {
            <p
              onClick={() => showCountry(index)}
              key={index}
              className="text-white text-center text-xl tracking-wider py-2 hover:cursor-pointer opacity-80 hover:opacity-100"
            >
              {item.name.common}
            </p>;
          })
        )}
        {input !== "" && list.length === 0 && (
          <p className="text-white text-center tracking-wider opacity-80">
            The country was not found.
          </p>
        )}
        {list?.length === 1 && (
          <div className="flex flex-col justify-between h-5/6">
            <Weather country={list[0].name.common} />
            <div className="bg-slate-800 w-full bg-opacity-70 lg:w-3/5 relative text-white tracking-wider p-4 rounded-md">
              <div className="flex items-center justify-start gap-4 mb-4">
                <h2 className="text-2x1">{list[0].name.common}</h2>
                <img
                  className="w-10"
                  src={list[0].flags.png}
                  alt={list[0].flags.alt}
                />
              </div>
              <p className="py-2">
                <span className="text-lg">Population: </span>
                {list[0].population}
              </p>
              <p>
                <span className="py-2">Capital: </span>
                {list[0].capital}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
