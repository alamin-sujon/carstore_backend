"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedFields = void 0;
exports.excludedFields = [
    'searchTerm',
    'price',
    'page',
    'limit',
    'sort',
    'fields',
    'maxPrice',
    'minPrice',
];
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((el) => {
                    var _a;
                    return ({
                        [el]: { $regex: (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm, $options: 'i' },
                    });
                }),
            });
        }
        return this;
    }
    price() {
        var _a, _b, _c, _d;
        if (((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.minPrice) && ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.maxPrice)) {
            this.modelQuery = this.modelQuery.find({
                price: {
                    $gte: Number((_c = this === null || this === void 0 ? void 0 : this.query) === null || _c === void 0 ? void 0 : _c.minPrice) || 0,
                    $lte: Number((_d = this === null || this === void 0 ? void 0 : this.query) === null || _d === void 0 ? void 0 : _d.maxPrice) || Number.MAX_SAFE_INTEGER,
                },
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        exports.excludedFields.forEach((el) => delete queryObj[el]);
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
        var _a;
        console.log('Query', this === null || this === void 0 ? void 0 : this.query);
        const sort = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) || '-createdAt';
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
        var _a, _b;
        const fields = ((_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',').join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const totalQueries = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(totalQueries);
            const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
            const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
            const totalPage = Math.ceil(total / limit);
            return {
                page,
                limit,
                total,
                totalPage,
            };
        });
    }
}
exports.default = QueryBuilder;
