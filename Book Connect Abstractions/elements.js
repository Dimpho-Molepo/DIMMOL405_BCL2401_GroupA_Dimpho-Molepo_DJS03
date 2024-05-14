export function getElement(selector) {
  return document.querySelector(selector);
}

export const elementsFromDOM = {
  dataListItems: getElement("[data-list-items]"),
  dataListMessage: getElement("[data-list-message]"),
  dataListBlur: getElement("[data-list-blur]"),
  dataListImage: getElement("[data-list-image]"),
  dataListTitle: getElement("[data-list-title]"),
  dataListSubtitle: getElement("[data-list-subtitle]"),
  dataListDescricption: getElement("[data-list-description]"),
  dataListButton: getElement("[data-list-button]"),
  dataListClose: getElement("[data-list-close]"),
  dataListActive: getElement("[data-list-active]"),

  dataSettingsCancel: getElement("[data-settings-cancel]"),
  dataSettingsTheme: getElement("[data-settings-theme]"),
  dataSettingsOverlay: getElement("[data-settings-overlay]"),
  dataSettingsForm: getElement("[data-settings-form]"),

  dataHeaderSearch: getElement("[data-header-search]"),
  dataHeaderSettings: getElement("[data-header-settings]"),

  dataSearchForm: getElement("[data-search-form]"),
  dataSearchOverlay: getElement("[data-search-overlay]"),
  dataSearchCancel: getElement("[data-search-cancel]"),
  dataSearchGenres: getElement("[data-search-genres]"),
  dataSearchAuthors: getElement("[data-search-authors]"),
  dataSearchTitle: getElement("[data-search-title]"),
};
