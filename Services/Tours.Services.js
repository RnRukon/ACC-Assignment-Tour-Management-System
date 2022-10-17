
const Tour = require("../Models/Tour");

exports.getToursServices = async (filters, queries) => {
    const tours = await Tour
        .find({})
        .select(queries?.fields)
        .sort(queries?.sortBy)
        .skip(queries.skip)
        .limit(queries.limit)

    const total = await Tour.countDocuments(filters);

    const page = Math.ceil(total / queries.limit)

    return { total, page, tours };
}

exports.createToursServices = async (data) => {

    const tours = await Tour.create(data);
    return tours;
}
exports.updateToursServices = async (tourId, data) => {

    const tours = await Tour.updateOne(
        { _id: tourId },
        { $set: data },
        {
            runValidators: true,
        }
    );
    return tours;
}



exports.deleteToursByIdServices = async (toursId) => {

    const tours = await Tour.deleteOne(
        { _id: toursId }
    );

    return tours;
}


exports.detailsToursByIdServices = async (id) => {

    const result = await Tour.findOne(
        { _id: id }
    );



    return result;
}
exports.getToursTrendingServices = async () => {

    const result = await Tour.find({}).sort("-view").limit(3);

    return result;
}
exports.getToursCheapestServices = async () => {

    const result = await Tour.find({}).sort("price").limit(3);

    return result;
}


