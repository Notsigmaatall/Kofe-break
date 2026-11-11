"use client";
import { useEffect, useState } from "react";
import { menu, categories, menuSource } from "@/lib/menu";
import { ProductCard } from "./product-card";
import { Icon } from "./icons";
export function MenuCatalog() {
  const [category, setCategory] = useState("all"),
    [query, setQuery] = useState(""),
    [temperature, setTemperature] = useState("all"),
    [sort, setSort] = useState("default");
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get("category");
    if (categories.some((c) => c.id === cat)) setCategory(cat!);
  }, []);
  const setCat = (id: string) => {
    setCategory(id);
    const u = new URL(window.location.href);
    if (id === "all") u.searchParams.delete("category");
    else u.searchParams.set("category", id);
    window.history.replaceState(null, "", u.pathname + u.search);
  };
  useEffect(() => {
    const change = () => {
      const cat = new URLSearchParams(window.location.search).get("category");
      setCategory(categories.some((c) => c.id === cat) ? cat! : "all");
    };
    window.addEventListener("popstate", change);
    return () => window.removeEventListener("popstate", change);
  }, []);
  const normalize = (s: string) =>
    s.toLocaleLowerCase("ru").replaceAll("ё", "е");
  const results = menu
    .filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (temperature === "all" || p.temperature === temperature) &&
        normalize(p.name).includes(normalize(query.trim())),
    )
    .slice()
    .sort((a, b) =>
      sort === "price-asc"
        ? a.price - b.price
        : sort === "price-desc"
          ? b.price - a.price
          : 0,
    );
  const reset = () => {
    setCat("all");
    setQuery("");
    setTemperature("all");
    setSort("default");
  };
  return (
    <div className="container catalog">
      <div className="catalog-search-row">
        <div className="search-field">
          <Icon name="search" />
          <input
            type="search"
            aria-label="Найти в меню"
            placeholder="Найти свою паузу: капучино, раф, чай…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="icon-button"
              aria-label="Очистить поиск"
              onClick={() => setQuery("")}
            >
              <Icon name="close" width="18" />
            </button>
          )}
        </div>
        <label className="sort-label">
          <span>Сортировка</span>
          <select
            aria-label="Сортировка меню"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Как в меню</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
          </select>
        </label>
      </div>
      <div className="catalog-layout">
        <aside className="category-sidebar">
          <span className="eyebrow">
            КАТЕГОРИИ <span className="mobile-hint">листайте →</span>
          </span>
          <div
            className="category-list"
            role="group"
            aria-label="Категории меню"
          >
            <button
              aria-pressed={category === "all"}
              className={category === "all" ? "selected" : ""}
              onClick={() => setCat("all")}
            >
              <span>Всё меню</span>
              <small>28</small>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                aria-pressed={category === c.id}
                className={category === c.id ? "selected" : ""}
                onClick={() => setCat(c.id)}
              >
                <span>{c.label}</span>
                <small>{menu.filter((p) => p.category === c.id).length}</small>
              </button>
            ))}
          </div>
          <div className="sidebar-note">
            <Icon name="cup" width="32" height="32" />
            <strong>
              Небольшая пауза.
              <br />
              Большой выбор.
            </strong>
            <p>10 категорий — от эспрессо до зерна для дома.</p>
          </div>
        </aside>
        <div className="catalog-results">
          <div className="results-toolbar">
            <div
              className="temperature-filter"
              role="group"
              aria-label="Температура напитка"
            >
              {[
                ["all", "Любой"],
                ["hot", "Горячий"],
                ["cold", "Холодный"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  aria-pressed={temperature === id}
                  className={temperature === id ? "selected" : ""}
                  onClick={() => setTemperature(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="result-count" aria-live="polite">
              Найдено: {results.length}
            </span>
          </div>
          {results.length ? (
            <div className="product-grid catalog-grid">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <Icon name="search" width="52" height="52" />
              <h2>Пока ничего не нашлось</h2>
              <p>Попробуйте другое название или вернитесь ко всему меню.</p>
              <button className="button primary" onClick={reset}>
                Показать всё меню <Icon name="arrow" />
              </button>
            </div>
          )}
          {(category !== "all" || query || temperature !== "all") &&
            results.length > 0 && (
              <button className="reset-filters text-button" onClick={reset}>
                Сбросить фильтры и показать всё меню ↗
              </button>
            )}
          <p className="image-note">
            Изображения — демонстрационные визуализации. Состав, аллергены и
            реальную подачу уточняйте в кофейне.
          </p>
        </div>
      </div>
      <div className="menu-source">
        <Icon name="clock" />
        <p>{menuSource}</p>
      </div>
    </div>
  );
}
