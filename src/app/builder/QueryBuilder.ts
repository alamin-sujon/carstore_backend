import { Query } from 'mongoose';

export const excludedFields = [
  'searchTerm',
  'price',
  'page',
  'limit',
  'sort',
  'fields',
  'maxPrice',
  'minPrice',
];
class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((el) => ({
          [el]: { $regex: this?.query?.searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  price() {
    if (this?.query?.minPrice && this?.query?.maxPrice) {
      this.modelQuery = this.modelQuery.find({
        price: {
          $gte: Number(this?.query?.minPrice) || 0,
          $lte: Number(this?.query?.maxPrice) || Number.MAX_SAFE_INTEGER,
        },
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    for (const key in queryObj) {
      if (queryObj[key] === 'null') {
        delete queryObj[key];
      }
    }
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  sort() {
    console.log('Query', this?.query);
    const sort = (this?.query?.sort as string) || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  // paginate() {
  //   const page = Number(this?.query?.page) || 1;
  //   const limit = Number(this?.query?.limit) || 6;
  //   const skip = (page - 1) * limit;
  //   this.modelQuery = this.modelQuery.skip(skip).limit(limit);
  //   return this;
  // }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
