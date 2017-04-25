import SearchModel from '../QueryModels/SearchModel';

const Search = new SearchModel();

exports.getAllUsernames = async (req, res) => {
  try {
    const [result] = await Search.getFirstLastGithubNames();
    res.json(result);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send(err.message);
  }
};