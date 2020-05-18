const { gql } = require('apollo-server');

const typeDefs = gql`
    """ A Map """
    type Map {
        """ The ID of this map """
        id: ID!
        """ The date on which this map was created """
        createdAt: String!
        """ The name of this map """
        mapName: String
        """ The description for this map """
        description: String
        """ The creator of this map """
        creatorName: String
    }

    """ Filter which can be applied to mapList """
    input MapListQuery {
        """ Selects all maps with this ID """
        id: ID
        """ Selects all maps with this mapName """
        mapName: String
        """ Selects all maps with this creatorName """
        creatorName: String
        """ Selects all maps created after this date """
        startDate: String
        """ Selects all maps created before this date """
        endDate: String
        """ MongoDB search operation to preform w/ the given fields (default AND) """
        operation: Operation
        """ When true, returns a psuedo-random selection of maps (note: overides all other params except size, may return duplicate maps)"""
        random: Boolean
    }

     """ A point on a map """
     type Point {
        """ The ID of this point """
        id: ID!
        """ The ID of the map with which this point is associated """
        mapId: ID!
        """ The name of this point """
        name: String!
        """ The coordinates of the point """
        coordinates: Coordinates!
        """ The description of this point """
        description: String
        """ The category of this point. One of: ART, MONUMENT, PUBLICSPACE, RESIDENCE, SCHOOL, BUISNESS, WORKPLACE, OTHER """
        category: String
        """ String used to describe a points category if it is OTHER """
        otherText: String
        """ The creator of this point """
        creatorName: String
    }

    """ Filter which can be applied to pointList """
    input PointListQuery {
        """ Selects the point with this ID """
        id: ID
        """ Selects all points with this mapID """
        mapId: ID
        """ Selects all maps with the given coordinants (inputed as an array of ints of length 2 in the form [x-coordinate, y-coordinate]) """
        coordinates: [Int!]
        """ Selects all points within this number of pixels from a given set of coordinates """
        within: Int
        """ Selects all points with the given creatorName """
        creatorName: String
        """ Selects all points with the given category """
        category: String
        """ MongoDB search operation to preform w/ the given fields (default AND) """
        operation: Operation
        """ When true, returns a psuedo-random selection of maps (note: overides all other params except size, may return duplicate maps)"""
        random: Boolean
    }

    """ The coordinates of a point on the map """
    type Coordinates {
        """ The x coordinate of the point """
        x: Int!
        """ The y coordinate of the point """
        y: Int!
    }

    """ Input for adding a point """
    input PointAdd {
        """ The name of this point """
        name: String!
        """ The coordinates of this point (inputed as an array of ints of length 2 in the form [x-coordinate, y-coordinate]) """
        coordinates: [Int!]!
        """ The description of this point """
        description: String
        """ The category of this point. One of: ART, MONUMENT, PUBLICSPACE, RESIDENCE, SCHOOL, BUISNESS, WORKPLACE, OTHER """
        category: String
        """ String used to describe a points category if it is OTHER """
        otherText: String
        """ The creator of this point """
        creatorName: String
    }

    """ MongoDB search operation """
    enum Operation {
        AND
        OR
        NOR
    }

    type Query {
        """ Given a maps ID, returns that map """
        map(id: ID!): Map

        """ Get a list of maps of a given size, starting on a given page, conforming to a given order """
        mapList(
            """ Query object for more specific searches """
            query: MapListQuery
            """ The number of maps to return (default 10) """
            size: Int
            """ The index of the page to return (default 0) """
            page: Int
        ): [Map]

        """ Given a point's ID, returns that point """
        point(id: ID!): Point

        """ Gets a list of points of a given size starting at a given page conforming to a given filter """
        pointList(
            """ Query object for more specific searches """
            query: PointListQuery
             """ The number of maps to return (default 10) """
             size: Int
            """ The index of the page to return (default 0) """
            page: Int
        ): [Point]
    }

    type Mutation {
        """ Used to add a map. Returns the ID of the added map """
        addMap(
            """ The name of this map """
            mapName: String
            """ The description of this map """
            description: String      
            """ The creator of this map """
            creatorName: String
        ): ID

        """ Used to add a point. Returns the ID of the added point """
        addPoint(
            """ The ID of the point's map """
            mapId: ID!
            """ The name of this point """
            name: String!
            """ An array of ints of length 2 giving the [x, y] coordinates of the point """
            coordinates: [Int!]!
            """ The description of this point """
            description: String
            """ The category of this point """ 
            category: String
            """ text to describe the category if it isn't one of the enumerated categories """
            otherText: String
            """ The creator of this point """ 
            creatorName: String
        ): ID

        """ (for use by the frontend) saves a map and associated points and returns maps ID  """ 
        saveMap(
            """ The name of this map  """
            mapName: String
            """ The description for this map  """
            description: String
            """ The creator of this map  """
            creatorName: String
            """ A list of the points to add  """
            points: [PointAdd]
        ): ID
    }
`;

module.exports = typeDefs;